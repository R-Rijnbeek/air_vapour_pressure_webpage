# =============== IMPORTS ==============

from flask import render_template, request, jsonify, abort

from air_vapour_pressure_dynamics import (  vapourpressure, 
                                            density_air ,
                                            absolutehumidity_kg_air, 
                                            absolutehumidity_m3_air,
                                            entalpie_kg_air,
                                            entalpie_m3_air, 
                                            moisuredeficit_kg_air,
                                            moisuredeficit_m3_air,
                                            dew_point_temperature
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
        return render_template("public/html/main.html", active_menu_1="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@test.route("/variacional", methods=["GET"])
@argument_check()
def variacional_calculus():
    try:
        return render_template("public/html/variacional.html", active_menu_2="w3-green"), 200
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

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass