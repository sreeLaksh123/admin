odoo.define('pos_import_sale_order.SaleOrderScreen', function(require) {
  'use strict';
  const PosComponent = require('point_of_sale.PosComponent');
  const ProductScreen = require('point_of_sale.ProductScreen');
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require('point_of_sale.Registries');

  var rpc = require('web.rpc');

  class SaleOrderScreen extends PosComponent {
      constructor(){
        super(...arguments);
        this.sale_order = this.env.pos.sale
        console.log(this.env.pos.sale[0].order_line,"conc")
      }
      back() {
        this.showScreen('ProductScreen');
        }
          async onClickImportSale(order) {
          console.log(order['order_line'], "ORDER LINE")
          var core = require('web.core');
          var self = this;
          var products
          rpc.query({
                model: 'sale.order.line',
                method: 'search_read',
                args: [[['order_id', '=', order.id]],['product_id']],
            }).then(function(data) {
                console.log(data,"data")
                products = data
                 self.showPopup("ProductsPopup", {
                                title : "Sale Order Products",
                                confirmText: "Cancel",
                                order: products,
                 });

       });
       }
      get state() {
        let state_mapping = {
          'draft': this.env._t('Quotation'),
          'sent': this.env._t('Quotation Sent'),
          'sale': this.env._t('Sales Order'),
          'done': this.env._t('Locked'),
          'cancel': this.env._t('Cancelled'),
        };
        return state_mapping[this.order.state];
        }
  }
  SaleOrderScreen.template = 'SaleOrderScreen';
  Registries.Component.add(SaleOrderScreen);
  return SaleOrderScreen;

});