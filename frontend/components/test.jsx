const React = require('react');
const ShopifyBuy = require('shopify-buy');

module.exports = React.createClass({
  componentDidMount(){
    let shopClient = ShopifyBuy.buildClient({
      accessToken: 'a3d202edb76035fc35f349766eb947a8',
      domain: 'brian-wood-test-store.myshopify.com',
      appId: '6'
    });
    let product = shopClient.fetchProduct('11426024068')
  },

  render(){
    return(
      <div></div>
    )
  }
})
