import React, { Fragment } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { generateProfileReport } from '../../_actions/adminActions';

const GenerateProfileReport = ({ reportUrl, generateProfileReport}) => {
  return ( 
    <Fragment>
      {
        !reportUrl ? (
          <span className="btn btn-primary btn-md" onClick={() => generateProfileReport()}>
            Generate report
          </span>
        ) : (
          <a href={reportUrl} target="_blank" rel="noopener noreferrer"  className="btn btn-success btn-md">
            Download Report
          </a>
        )
      }
    </Fragment>
   );
}
  
GenerateProfileReport.propTypes = {
  generateProfileReport: PropTypes.func.isRequired
  // setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  reportUrl: state.admin.reportUrl
});
export default connect(mapStateToProps, {  generateProfileReport})(GenerateProfileReport);

