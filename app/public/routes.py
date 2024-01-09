# =============== IMPORTS ==============

from flask import render_template, request, jsonify, abort

from basic_decorators import argument_check

from app.utils import ( process_basic_PostRequest, 
                        process_variacional_PostRequest
                    )

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
        rh = float(form.get("rh", type=float))

        results = process_basic_PostRequest(temp, rh)

        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)


@api.route("/post_variacional_request", methods=["POST"])
@argument_check()
def variacional_process():
    try:
        form = request.form

        temp = float(form.get("temp",type=float))
        delta_temp = float(form.get("delta_temp",type=float))
        rh = float(form.get("rh", type=float))
        delta_rh = float(form.get("delta_rh", type=float))

        results = process_variacional_PostRequest(temp, delta_temp, rh,delta_rh)

        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass