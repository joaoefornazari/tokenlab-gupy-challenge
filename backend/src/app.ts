import Express, { Request, Response, NextFunction } from 'express';

import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.ts';
import usersRouter from './routes/users.ts';
import eventsRouter from './routes/events.ts';

const app = Express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
app.use(logger('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(Express.static(path.join(__dirname, 'public')));

const apiPrefix = process.env.API_PREFIX;

app.use(`${apiPrefix}`, indexRouter);
app.use(`${apiPrefix}/users`, usersRouter);
app.use(`${apiPrefix}/events`, eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

interface HTTPError extends Error {
	status?: number;
}

// error handler
app.use(function(err: HTTPError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
