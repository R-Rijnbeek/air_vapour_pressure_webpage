# =============== IMPORTS ===============

from basic_decorators import argument_check
from air_vapour_pressure_dynamics import UnitFloat

# =============== ROUNDING NUMBERS ===============

@argument_check((float,int), decimals=int )
def roundWithDecimals(floatNumber, decimals=2):
    a = decimals*10
    return round(floatNumber*a)/a

@argument_check(UnitFloat)
def MakeUpValueWithUnits(value):
    cleanValue = roundWithDecimals(value)
    unit = value.unit
    return f"{cleanValue}   {unit}"
