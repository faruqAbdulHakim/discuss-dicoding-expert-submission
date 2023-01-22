import React from 'react';
import PropTypes from 'prop-types';

function ThreadFilter({ filter, filtersList, onChange }) {
  return (
    <div>
      <div>
        Filter by category:
      </div>
      <div className="flex gap-2 flex-wrap">
        {filtersList.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`text-sm rounded-sm px-2 py-0.5 ${value === filter ? 'bg-slate-500 text-white' : 'bg-slate-200'}`}
          >
            {`#${value}`}
          </button>
        ))}
      </div>
    </div>
  );
}

ThreadFilter.propTypes = {
  filter: PropTypes.string,
  filtersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

ThreadFilter.defaultProps = {
  filter: null,
};

export default ThreadFilter;
