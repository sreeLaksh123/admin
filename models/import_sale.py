from odoo import models, fields, api


class PosConfiguration(models.TransientModel):
    _inherit = 'res.config.settings'
    import_sale = fields.Boolean(string='Import Sale Order')

    @api.model
    def get_values(self):
        res = super(PosConfiguration, self).get_values()
        res.update(
            import_sale=self.env['ir.config_parameter'].sudo().get_param(
                'pos_import_sale_order.import_sale'),
        )
        return res

    @api.depends('import_sale')
    def set_values(self):
        super(PosConfiguration, self).set_values()
        param = self.env['ir.config_parameter'].sudo()
        sale_import = self.import_sale
        param.set_param('pos_import_sale_order.import_sale', sale_import)


class PosSessionLoad(models.Model):
    _inherit = 'pos.session'

    def _pos_ui_models_to_load(self):
        result = super()._pos_ui_models_to_load()
        new_model = 'sale.order'
        if new_model not in result:
            result.append(new_model)
            print(result)
        return result

    def _loader_params_sale_order(self):
        return {
            'search_params': {
                'domain': [('state', '=', 'sale')],
            }
        }

    def _get_pos_ui_sale_order(self, params):
        sale = self.env['sale.order'].search_read(**params['search_params'])
        print(sale)
        return sale


class PosConfigLoad(models.Model):
    _inherit = 'pos.session'

    def _pos_ui_models_to_load(self):
        result = super()._pos_ui_models_to_load()
        print(result, "res")
        new_model = 'res.config.settings'
        if new_model not in result:
            result.append(new_model)
            print(result)
        return result

    def _loader_params_res_config_settings(self):
        return {
            'search_params': {
                'fields': ['import_sale'
                           ],
            }
        }

    def _get_pos_ui_res_config_settings(self, params):
        import_sale = self.env['res.config.settings'].search_read(**params['search_params'])
        import_sales = import_sale[len(import_sale) - 1]
        return import_sales
