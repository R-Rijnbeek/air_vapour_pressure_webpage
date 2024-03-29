# =============== IMPORTS ==============

from flask import render_template, jsonify, abort, request

from basic_decorators import argument_check

from app.utils import ( 
                        process_basic_PostRequest, 
                        process_variacional_PostRequest,
                        process_graphicUpdate_PostRequest,
                        process_datatable_PostRequest
                    )

from app.shared import LOG

from . import tab1, tab2, tab3, tab4

# =============== DEFINE ENTRYPOINTS ==============

@tab1.route("/", methods=["GET"])
@argument_check()
def get_userlist():
    try:
        print(tab1)
        return render_template("html/basic_calculations.html", active_menu_1="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@tab2.route("/variacional", methods=["GET"])
@argument_check()
def variacional_calculus():
    try:
        return render_template("html/variacional_calculations.html", active_menu_2="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@tab3.route("/graphic_view", methods=["GET"])
@argument_check()
def graphic_view():
    try:
        return render_template("html/graphic_view.html", active_menu_3="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@tab4.route("/data_table", methods=["GET"])
@argument_check()
def data_table():
    try:
        return render_template("html/data_table.html", active_menu_4="w3-green"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)


@tab1.route("/post_request", methods=["POST"])
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


@tab2.route("/post_variacional_request", methods=["POST"])
@argument_check()
def variacional_process():
    try:
        form = request.form

        temp = float(form.get("temp",type=float))
        delta_temp = float(form.get("delta_temp",type=float))
        rh = float(form.get("rh", type=float))
        delta_rh = float(form.get("delta_rh", type=float))

        results = process_variacional_PostRequest(temp, delta_temp, rh, delta_rh)

        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

@tab3.route("/post_graphic_request", methods=["POST"])
@argument_check()
def variacional_process():
    try:
        form = request.form

        temp = float(form.get("temp",type=float))
        
        results = process_graphicUpdate_PostRequest(temp)

        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

@tab4.route("/post_datatable_request", methods=["POST"])
@argument_check()
def datatable_process():
    try:
        results = process_datatable_PostRequest()
        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)



# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass