odoo.define('pos_import_saleorder.import_button', function(require) {
'use strict';
       const PosComponent = require('point_of_sale.PosComponent');
       const ProductScreen = require('point_of_sale.ProductScreen');
       const { useListener } = require("@web/core/utils/hooks");
       const Registries = require('point_of_sale.Registries');


   class SaleOrderButton extends PosComponent {
       constructor() {
           super(...arguments);
           this.button_sale = this.env.pos.import_sale
           console.log(this.button_sale['import_sale'], 'IMPORT')
//           useListener('click', this.onClick);
       }
       async onClick() {
            this.showScreen('SaleOrderScreen');
        }
       }

   SaleOrderButton.template = 'SaleOrderButton';
   ProductScreen.addControlButton({
       component: SaleOrderButton,
       condition: function() {
           return true;
       },
    position: ['before', 'SetFiscalPositionButton'],
   });

   Registries.Component.add(SaleOrderButton);
   return SaleOrderButton;
});