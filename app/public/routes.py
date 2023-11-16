from flask import render_template

from app.shared import LOG
from app.utils import MuSuperMethod

from . import test

@test.route("/test", methods=["GET"])
def get_userlist():
    LOG.info("HolAHOLA")
    MuSuperMethod()
    return render_template("public/html/test.html"), 200

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass