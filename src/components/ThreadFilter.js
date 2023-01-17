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
  filter: PropTypes.string.isRequired,
  filtersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThreadFilter;
