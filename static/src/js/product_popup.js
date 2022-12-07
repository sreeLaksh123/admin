odoo.define('pos_import_sale_order.ProductsPopup', function(require) {
  'use strict';
  const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
  const PosComponent = require('point_of_sale.PosComponent');
  const ProductScreen = require('point_of_sale.ProductScreen');
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require('point_of_sale.Registries');
  const NumberBuffer = require('point_of_sale.NumberBuffer');
  const { Orderline } = require('point_of_sale.models');

  class ProductsPopup extends AbstractAwaitablePopup {
    setup() {
            super.setup();
            }
            async onClickAdd()
            {
                for(var line of this.props.order)
                {
                    var quantity = parseFloat($(`[data-product=${line.product_id[0]}]`).val());
                    if(!quantity){
                        this.showPopup('ErrorPopup', {
                            title: 'Quantity!!!!!',
                            body: 'Enter the Quantity',
                        });
                        return false;
                    }
                    var product = this.env.pos.db.get_product_by_id(line.product_id[0])
                    this.env.pos.get_order().add_product(product, {quantity: quantity})
                }
            }
            }
    ProductsPopup.template = 'ProductsPopup';
    Registries.Component.add(ProductsPopup);
    return ProductsPopup;
  });