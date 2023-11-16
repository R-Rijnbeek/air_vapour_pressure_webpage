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

from app.utils import roundWithDecimals

from app.shared import LOG

from . import test, api


@test.route("/test", methods=["GET"])
def get_userlist():
    return render_template("public/html/test.html"), 200

@api.route("/test_post", methods=["POST"])
def process():
    try:
        form = request.form
        temp = int(form.get("temp",type=int))
        hr = int(form.get("hr", type=int))
        results = {
            'processed':{
                "vapourpressure": roundWithDecimals(vapourpressure(temp)),
                "density_air": roundWithDecimals(density_air(temp,hr)),
                "absolutehumidity_kg_air": roundWithDecimals(absolutehumidity_kg_air(temp,hr)),
                "absolutehumidity_m3_air": roundWithDecimals(absolutehumidity_m3_air(temp,hr)),
                "entalpie_kg_air": roundWithDecimals(entalpie_kg_air(temp,hr)),
                "entalpie_m3_air": roundWithDecimals(entalpie_m3_air(temp,hr)),
                "moisuredeficit_kg_air": roundWithDecimals(moisuredeficit_kg_air(temp,hr)),
                "moisuredeficit_m3_air": roundWithDecimals(moisuredeficit_m3_air(temp,hr)),
                "dew_point_temperature": roundWithDecimals(dew_point_temperature(temp,hr))
            }
        }
        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)



# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass