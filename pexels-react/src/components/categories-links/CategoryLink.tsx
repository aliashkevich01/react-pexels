import { randomizeQueries } from '../../utils';
import classes from './category-link.module.css';
import { FormattedMessage } from 'react-intl';
import { Fragment } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLink = React.memo(function CategoryLink() {
  const generatedLinks = randomizeQueries();
  return (
    <div className={classes.category_wrap}>
      <p className={classes.category_text}>
        <FormattedMessage id="caterory_links_description" />
      </p>
      :
      <Fragment>
        {generatedLinks.map((item, idx) => {
          return (
            <Link to={`/categories?search=${item}`} key={idx} className={classes.category_link}>
              <FormattedMessage id={item} />
            </Link>
          );
        })}
      </Fragment>
    </div>
  );
});

export default CategoryLink;
