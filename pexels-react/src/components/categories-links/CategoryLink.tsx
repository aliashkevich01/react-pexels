import { randomizeQueries } from '../../utils';
import classes from './category-link.module.css';
import { FormattedMessage } from 'react-intl';
import { Fragment } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchByQueryAction } from '../../redux/actions/actions';
import { StateInterface } from '../../interfaces/StateInterface';

const CategoryLink = React.memo(function CategoryLink() {
  const data: StateInterface = useSelector((state: StateInterface) => state);
  const dispatch = useDispatch();
  const generatedLinks = randomizeQueries();
  const handleClick = (value: string) => {
    dispatch(SearchByQueryAction(data, value));
  };
  return (
    <div className={classes.category_wrap}>
      <p className={classes.category_text}>
        <FormattedMessage id="caterory_links_description" />
      </p>
      :
      <Fragment>
        {generatedLinks.map((item, idx) => {
          return (
            <Link
              to="/categories"
              query={item}
              key={idx}
              className={classes.category_link}
              onClick={() => {
                handleClick(item);
              }}
            >
              <FormattedMessage id={item} />
            </Link>
          );
        })}
      </Fragment>
    </div>
  );
});

export default CategoryLink;
