/**
 * Provides root component for '/sample' page
 * @module #page/Sample
 */
import Button from '#atom/Button';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import { Link } from 'react-router-dom';

// tslint:disable-next-line: no-console
const cb = () => console.log('work');
/**
 * Root component for '/sample' page
 */
const Sample = (): JSX.Element => (
  <div>
    This link helps you to <Link to="/home">go home</Link> now, so...
    <br />
    <Input />
    <Button onClick={cb}>button</Button>
  </div>
);

export default Sample;
