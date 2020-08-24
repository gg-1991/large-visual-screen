module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-plugin-bem-atrule': {
            style: 'bem',
            separators: {
                descendent: '__',
                modifier: '--'
            },
            shortcuts: {
                utility: 'util',
                component: 'block',
                descendent: 'element',
                modifier: 'modifier'
            }
        },
        'postcss-nested': {},
        'postcss-nested-ancestors': {}
    }
}
