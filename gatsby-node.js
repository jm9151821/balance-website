const path = require(`path`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      query {
      	posts: allContentfulPost {
      	  edges {
      	    node {
              slug
      	    }
      	  }
      	}
      }
    `).then(result => {
      result.data.posts.edges.map(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/layouts/post.js`),
          context: {
            slug: node.slug
          }
        });
      });
      resolve();
    });
  });
};
