# =============== IMPORTS ===============

import sympy as sp

import numpy as np

from basic_decorators import argument_check

from air_vapour_pressure_dynamics import (  setApplyUnits,
                                            vapourpressure, 
                                            density_air ,
                                            absolutehumidity_kg_air, 
                                            absolutehumidity_m3_air,
                                            entalpie_kg_air,
                                            entalpie_m3_air, 
                                            moisuredeficit_kg_air,
                                            moisuredeficit_m3_air,
                                            dew_point_temperature,
                                            UnitFloat
                                        )

# =============== ROUNDING NUMBERS ===============



@argument_check((float,int))
def roundWithDecimals(floatNumber):
    return f"{floatNumber:.2f}"

@argument_check(UnitFloat)
def MakeUpValueWithUnits(value):
    cleanValue = roundWithDecimals(value)
    unit = value.unit
    return f"{cleanValue}   {unit}"

@argument_check((float,int),str)
def ManualValueWithUnits(value, unit):
    cleanValue = roundWithDecimals(value)
    return f"{cleanValue}   {unit}"

def process_basic_PostRequest(temp, rh):

    results = {
        'processed':{
            "vapourpressure": MakeUpValueWithUnits(vapourpressure(temp)),
            "density_air": MakeUpValueWithUnits(density_air(temp,rh)),
            "absolutehumidity_kg_air": MakeUpValueWithUnits(absolutehumidity_kg_air(temp,rh)),
            "absolutehumidity_m3_air": MakeUpValueWithUnits(absolutehumidity_m3_air(temp,rh)),
            "entalpie_kg_air": MakeUpValueWithUnits(entalpie_kg_air(temp,rh)),
            "entalpie_m3_air": MakeUpValueWithUnits(entalpie_m3_air(temp,rh)),
            "moisuredeficit_kg_air": MakeUpValueWithUnits(moisuredeficit_kg_air(temp,rh)),
            "moisuredeficit_m3_air": MakeUpValueWithUnits(moisuredeficit_m3_air(temp,rh)),
            "dew_point_temperature": MakeUpValueWithUnits(dew_point_temperature(temp,rh))
        }
    }
    return results

def delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=None):
    
    TEMP = sp.Symbol("temp")
    RH = sp.Symbol("hr")

    diff_method_by_Temp = sp.diff(METHOD(TEMP,RH),TEMP)
    diff_method_by_RH = sp.diff(METHOD(TEMP,RH),RH)

    delta_Temp_contribution = sp.N(diff_method_by_Temp.subs([(TEMP, temp), (RH, rh)]))
    delta_RH_contribution = sp.N(diff_method_by_RH.subs([(TEMP, temp), (RH, rh)]))

    result = delta_Temp_contribution * delta_temp + delta_RH_contribution * delta_rh

    return float(result)

def delta_AbsoluteHumidity_kg_air(temp, delta_temp, rh, delta_rh):
    return delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=absolutehumidity_kg_air)

def delta_AbsoluteHumidity_m3_air(temp, delta_temp, rh, delta_rh):
    return delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=absolutehumidity_m3_air)

def delta_entalpie_kg_air(temp, delta_temp, rh, delta_rh):
    return delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=entalpie_kg_air)

def delta_entalpie_m3_air(temp, delta_temp, rh, delta_rh):
    return delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=entalpie_m3_air)

def process_variacional_PostRequest(temp, delta_temp, rh,delta_rh):

    ab_hu_kg = MakeUpValueWithUnits(absolutehumidity_kg_air(temp, rh))
    entalpie_kg = MakeUpValueWithUnits(entalpie_kg_air(temp, rh))

    setApplyUnits(False) #Because bug is not yet solved

    delta_ab_hu_kg  = ManualValueWithUnits(delta_AbsoluteHumidity_kg_air(temp, delta_temp, rh, delta_rh),"Δ g/Kg h")
    delta_entalpie_kg = ManualValueWithUnits(delta_entalpie_kg_air(temp, delta_temp, rh, delta_rh), "Δ KJ/Kg h")

    results = {
        'processed':{
            "absolutehumidity_kg_air": ab_hu_kg,
            "delta_absolutehumidity_kg_air": delta_ab_hu_kg,
            "entalpie_kg_air": entalpie_kg,
            "delta_entalpie_kg_air": delta_entalpie_kg
        }
    }

    setApplyUnits(True) #Because bug is not yet solved

    return results

def row_calculation(temp, rh):
    return {
        "RH":round(rh,2) ,
        "ab_hu": round(absolutehumidity_kg_air(temp, rh),2),
        "entalpie_kg": round(entalpie_kg_air(temp,rh),2)
        }

def process_graphicUpdate_PostRequest(temp):

    rh_list = list(range(1,100))
    calculation_list = []
    for rh in rh_list:
        calculation_list.append(row_calculation(temp, rh))

    results = {'processed': calculation_list}
    
    return results


def process_datatable_PostRequest():

    elems = np.arange(0, 100, 1)
    temp = np.repeat(elems, 100)
    rh = np.tile(elems,100)

    density = np.round(density_air(temp,rh),3)
    ab_h_kg = np.round(absolutehumidity_kg_air(temp,rh),3)
    entalpie_kg = np.round(entalpie_kg_air(temp,rh),3)

    data = [{"t":temp_el, "rh":rh_el,"density": density_el, "ab_h_kg":ab_h_kg_el, "entalpie_kg":entalpie_kg_el} for temp_el, rh_el, density_el,  ab_h_kg_el, entalpie_kg_el in zip(temp.tolist(), rh.tolist(), density.tolist(), ab_h_kg.tolist(), entalpie_kg.tolist() )]

    collumns = [{ "data" : "t", "title" : "Temperature (ºC)" },
                { "data" : "rh", "title" : "Relative Humidity (%)" },
                { "data" : "density", "title" : "density (gr/m^3)" },
                { "data" : "ab_h_kg", "title" : "Absolutehumidity (g/Kg)" },
                { "data" : "entalpie_kg", "title" : "Entalpie (KJ/Kg)" }]

    results = {
            "columns": collumns,
            "data": data
        }
    
    return results


