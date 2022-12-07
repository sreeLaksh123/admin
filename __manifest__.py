{
    'name': "POS Import Sale Order",
    'version': '16.0.1.0.0',
    'depends': ['base', 'stock', 'sale', 'point_of_sale'],
    'author': "Sreelakshmi",
    # 'category': 'Accounting/Accounting',
    'sequence': -210,
    'installable': True,
    'application': True,

    'data': [
            'views/import_sale.xml',
    ],
    'assets': {
            'point_of_sale.assets': [
                'pos_import_sale_order/static/src/js/import_button.js',
                'pos_import_sale_order/static/src/js/sale_order_screen.js',
                'pos_import_sale_order/static/src/js/pos.js',
                'pos_import_sale_order/static/src/js/product_popup.js',
                'pos_import_sale_order/static/src/xml/import_popup.xml',
                'pos_import_sale_order/static/src/xml/import_button.xml',
                'pos_import_sale_order/static/src/xml/sale_order_screen.xml',
            ],
        },

    'installable': True,
    'application': True,
}
