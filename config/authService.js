// Configuration for Shoutem authentication service.
//    - url: endpoint for service
//    - sub: subject for authentication service contained in JWT
// TODO: Tenodi - Change this to api.shoutem.com once it's deployed
// TODO: Tenodi - These informations shouldn't be held in configuration files
//                but in environment variables
export default {
  url: 'https://api.balerion.sauros.hr',
  sub: 'service:authentication',
};
