import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import AccountsRoute from '@/routes/accounts.route';
import UserProfileRoute from '@/routes/userProfiles.route';
import AchievedRoute from './routes/achieved.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AccountsRoute(), new AchievedRoute(), new AuthRoute(), new UserProfileRoute()]);

app.listen();
