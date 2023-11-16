from .shared import LOG

def MuSuperMethod():
    LOG.debug("QQR")

def roundWithDecimals(floatNumber, decimals=2):
    a = decimals*10
    return round(floatNumber*a)/a
