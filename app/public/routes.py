# =============== IMPORTS ==============

from flask import render_template, request, jsonify, abort

import sympy as sp

from air_vapour_pressure_dynamics import (  vapourpressure, 
                                            density_air ,
                                            absolutehumidity_kg_air, 
                                            absolutehumidity_m3_air,
                                            entalpie_kg_air,
                                            entalpie_m3_air, 
                                            moisuredeficit_kg_air,
                                            moisuredeficit_m3_air,
                                            dew_point_temperature,
                                            setArgumentCheck,
                                            setApplyUnits
                                        )

from basic_decorators import argument_check

from app.utils import MakeUpValueWithUnits

from app.shared import LOG

from . import test, api

# =============== DEFINE ENTRYPOINTS ==============

@test.route("/", methods=["GET"])
@argument_check()
def get_userlist():
    try:
        return render_template("public/html/basic_calculations.html", active_menu_1="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@test.route("/variacional", methods=["GET"])
@argument_check()
def variacional_calculus():
    try:
        return render_template("public/html/variacional_calculations.html", active_menu_2="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)
    

@api.route("/post_request", methods=["POST"])
@argument_check()
def process():
    try:
        form = request.form
        temp = float(form.get("temp",type=float))
        hr = float(form.get("hr", type=float))

        results = {
            'processed':{
                "vapourpressure": MakeUpValueWithUnits(vapourpressure(temp)),
                "density_air": MakeUpValueWithUnits(density_air(temp,hr)),
                "absolutehumidity_kg_air": MakeUpValueWithUnits(absolutehumidity_kg_air(temp,hr)),
                "absolutehumidity_m3_air": MakeUpValueWithUnits(absolutehumidity_m3_air(temp,hr)),
                "entalpie_kg_air": MakeUpValueWithUnits(entalpie_kg_air(temp,hr)),
                "entalpie_m3_air": MakeUpValueWithUnits(entalpie_m3_air(temp,hr)),
                "moisuredeficit_kg_air": MakeUpValueWithUnits(moisuredeficit_kg_air(temp,hr)),
                "moisuredeficit_m3_air": MakeUpValueWithUnits(moisuredeficit_m3_air(temp,hr)),
                "dew_point_temperature": MakeUpValueWithUnits(dew_point_temperature(temp,hr))
            }
        }
        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

def delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=None):
    
    TEMP = sp.Symbol("temp")
    RH = sp.Symbol("hr")

    diff_method_by_Temp = sp.diff(METHOD(TEMP,RH),TEMP)
    diff_method_by_RH = sp.diff(METHOD(TEMP,RH),RH)

    delta_Temp_contribution = sp.N(diff_method_by_Temp.subs([(TEMP, temp), (RH, rh)]))
    delta_RH_contribution = sp.N(diff_method_by_RH.subs([(TEMP, temp), (RH, rh)]))

    result = delta_Temp_contribution * delta_temp + delta_RH_contribution * delta_rh

    return result

def delta_AbsoluteHumidity(temp, delta_temp, rh, delta_rh):
    return delta_Method_change(temp, delta_temp, rh, delta_rh, METHOD=absolutehumidity_kg_air)


@api.route("/post_variacional_request", methods=["POST"])
@argument_check()
def variacional_process():
    try:
        form = request.form

        temp = float(form.get("temp",type=float))
        delta_temp = float(form.get("delta_temp",type=float))
        rh = float(form.get("hr", type=float))
        delta_rh = float(form.get("delta_hr", type=float))

        setArgumentCheck(False)
        setApplyUnits(False)

        TEMP = sp.Symbol("temp")
        RH = sp.Symbol("rh")


        diff_ab_hu_by_Temp = sp.diff(absolutehumidity_kg_air(TEMP,RH),TEMP)
        diff_ab_hu_by_RH = sp.diff(absolutehumidity_kg_air(TEMP,RH),RH)

        delta_Temp_contribution = sp.N(diff_ab_hu_by_Temp.subs([(TEMP, temp), (RH, rh)]))
        delta_RH_contribution = sp.N(diff_ab_hu_by_RH.subs([(TEMP, temp), (RH, rh)]))

        result = delta_Temp_contribution * delta_temp + delta_RH_contribution * delta_rh

        print(delta_Temp_contribution)
        print(delta_RH_contribution)
        print (result)




        results = {
            'processed':{
                "temp": temp,
                "delta_temp": delta_temp,
                "hr": rh,
                "delta_hr": delta_rh 
            }
        }
        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass