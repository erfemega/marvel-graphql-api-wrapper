import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { fetchURI, getHash } from "../utils.js";

const CharacterType = new GraphQLObjectType({
  name: 'character',
  description: 'the character type',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    modified: { type: GraphQLString },
    resourceURI: { type: GraphQLString }
    //urls: { type: new GraphQLList(GraphQLString) },
    //thumbnail: { type: GraphQLString },
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a wrapper for marverl superheroes api',
  fields: () => ({
    allCharacters: {
      type: new GraphQLList(CharacterType),
      resolve: async root => {
        const response = await fetchURI('v1/public/characters')
        return response.data.results;
      }
    },
    character: {
      type: CharacterType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => `you are finding this ${args.id} id`
    }
  })
})

const schema = new GraphQLSchema({
  query: QueryType,
})

export default schema;