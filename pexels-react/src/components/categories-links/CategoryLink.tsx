import { getRandomInt, randomizeQueries } from '../../redux/utils';
import classes from './category-link.module.css';
import { FormattedMessage } from 'react-intl';
import { Fragment } from 'react';
import React from 'react';

const CategoryLink = React.memo(function CategoryLink() {
  const generatedLinks = randomizeQueries();
  const handleClick = (value: string) => {
    sessionStorage.setItem('query', value);
    window.location.href = '/categories';
  };
  return (
    <div className={classes.category_wrap}>
      <p className={classes.category_text}>
        <FormattedMessage id="caterory_links_description" />
      </p>
      :
      <Fragment>
        {generatedLinks.map((item) => {
          return (
            <p
              key={getRandomInt(100000)}
              className={classes.category_link}
              onClick={() => {
                handleClick(item);
              }}
            >
              <FormattedMessage id={item} />
            </p>
          );
        })}
      </Fragment>
    </div>
  );
});

export default CategoryLink;
