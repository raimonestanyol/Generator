from django.db import models


class DataRegistry(models.Model):
    AMB_T = models.DecimalField(db_column='AMB_T', max_digits=3, decimal_places=1)
    BOILER_T = models.DecimalField(db_column='BOILER_T', max_digits=3, decimal_places=1)
    COOL_FLOW = models.DecimalField(db_column='COOL_FLOW', max_digits=3, decimal_places=1)
    COOL_T_IN = models.DecimalField(db_column='COOL_T_IN', max_digits=3, decimal_places=1)
    COOL_T_OUT = models.DecimalField(db_column='COOL_T_OUT', max_digits=3, decimal_places=1)
    CURRENT = models.DecimalField(db_column='CURRENT', max_digits=3, decimal_places=2)
    E_ENERGY = models.PositiveIntegerField(db_column='E_ENERGY')
    E_POWER = models.SmallIntegerField(db_column='E_POWER')
    HEAT_T_CON = models.DecimalField(db_column='HEAT_T_CON', max_digits=4, decimal_places=1)
    HEAT_T_LIM = models.DecimalField(db_column='HEAT_T_LIM', max_digits=4, decimal_places=1)
    STATUS = models.PositiveIntegerField(db_column='STATUS')
    VOLTAGE = models.DecimalField(db_column='VOLTAGE', max_digits=4, decimal_places=1)
    DATETIME = models.DateTimeField(db_column='DATETIME')

    class Meta:
        managed = False
        db_table = 'data_registry'
