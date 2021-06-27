const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'tournaments', url: 'http://localhost:4000' },
    {
      name: 'games',
      url: 'https://90pidpdgil.execute-api.af-south-1.amazonaws.com/dev/graphql',
    },
    {
      name: 'matches',
      url: 'https://rmwkdnsqqi.execute-api.af-south-1.amazonaws.com/dev/graphql',
    },
    {
      name: 'users',
      url: 'https://1os2rngkij.execute-api.af-south-1.amazonaws.com/dev/graphql',
    },
  ],
  introspectionHeaders: {
    'app-id': 'gather-gateway',
  },
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
    });
  },
});

const start = async () => {
  const context = ({ req }) => ({ Authorization: req.headers.authorization });
  const server = new ApolloServer({ gateway, subscriptions: false, context });

  server.listen(5000).then(({ url }) => {
    console.log(`\n\n🖍`);
    console.log(`🖍 🖍`);
    console.log(`🎨🎨🎨      The Gather Gateway API`);
    console.log(`👨‍👨‍👧‍👦    running at ${url}`);
    console.log(`⭐️⭐ `);
    console.log(`⭐️ \n\n\n`);
  });
};

start();
