import React from 'react';

import './WordField.css';

const wordField = (props) => {
	return(
		<div className="WordField">
			<p>You word is:</p>
			<p className="Word">{props.word}</p>
		</div>
	);
}

export default wordField;