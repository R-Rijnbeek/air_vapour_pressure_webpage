from flask import Flask

from app.shared import LOG


def create_app():
    app = Flask(__name__)

    app.config.from_pyfile("dev_config.cfg")
    """
    LOG.init_app(app)

    LOG.info("Hello")
    LOG.debug("debuger")
    LOG.info("Hello")
    LOG.debug("debuger")
    LOG.info("Hello")
    LOG.debug("debuger")
    LOG.info("Hello")
    LOG.debug("debuger")
    """

    print("")
    #print(LOG.getStream())

    from .public import test
    app.register_blueprint(test)

    app.run()

    return app