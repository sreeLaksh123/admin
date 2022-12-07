odoo.define('pos_import_sale_order.pos', function (require) {
"use strict";
var { PosGlobalState, Order} = require('point_of_sale.models');
const Registries = require('point_of_sale.Registries');

const PosVanSalePosGlobalState = (PosGlobalState) => class PosVanSalePosGlobalState extends PosGlobalState {
async _processData(loadedData) {
    await super._processData(...arguments);
    this.sale = loadedData['sale.order'];
    this.import_sale = loadedData['res.config.settings'];
    console.log('ProductScreen', this)
    }
    }
Registries.Model.extend(PosGlobalState, PosVanSalePosGlobalState);
});