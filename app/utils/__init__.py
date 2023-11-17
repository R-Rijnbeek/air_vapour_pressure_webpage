# =============== IMPORTS ===============

from basic_decorators import argument_check

# =============== ROUNDING NUMBERS ===============

@argument_check((float,int), decimals=int )
def roundWithDecimals(floatNumber, decimals=2):
    a = decimals*10
    return round(floatNumber*a)/a
