# =============== IMPORTS ===============

import sympy as sp

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

@argument_check((float,int), decimals=int )
def roundWithDecimals(floatNumber, decimals=2):
    a = decimals*10
    return round(floatNumber*a)/a

@argument_check(UnitFloat)
def MakeUpValueWithUnits(value):
    cleanValue = roundWithDecimals(value)
    unit = value.unit
    return f"{cleanValue}   {unit}"


def process_basic_PostRequest(temp, rh):

    setApplyUnits(True)

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

    setApplyUnits(False)

    ab_hu_kg = absolutehumidity_kg_air(temp, rh)
    entalpie_kg = entalpie_kg_air(temp, rh)
    delta_ab_hu_kg  = delta_AbsoluteHumidity_kg_air(temp, delta_temp, rh, delta_rh)
    delta_entalpie_kg = delta_entalpie_kg_air(temp, delta_temp, rh, delta_rh)

    results = {
        'processed':{
            "absolutehumidity_kg_air": roundWithDecimals(ab_hu_kg),
            "delta_absolutehumidity_kg_air": roundWithDecimals(entalpie_kg, decimals=4),
            "entalpie_kg_air": roundWithDecimals(delta_ab_hu_kg),
            "delta_entalpie_kg_air": roundWithDecimals(delta_entalpie_kg, decimals=4)
        }
    }
    return results