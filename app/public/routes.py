from flask import render_template

from air_vapour_pressure_dynamics import entalpie_m3_air

from app.shared import LOG
#from app.utils import MuSuperMethod

from . import test

@test.route("/test", methods=["GET"])
def get_userlist():
    a = entalpie_m3_air(20,50)
    #LOG.info(a)
    #MuSuperMethod()
    return render_template("public/html/test.html", entalpie_m3_air = a), 200

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass