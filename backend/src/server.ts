import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import AccountsRoute from '@/routes/accounts.route';
import UserProfileRoute from '@/routes/userProfiles.route';
import AchievedRoute from './routes/achieved.route';
import PostRoute from '@/routes/post.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostRoute() ,new AccountsRoute(), new AchievedRoute() , new UserProfileRoute()]);

app.listen();
