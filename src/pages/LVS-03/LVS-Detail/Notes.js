import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Notes = (props) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');


	return (
		<div class="form-group">
         <FormGroup>
                   <Label for="exampleText">Note</Label>
                   <Input type="textarea" name="text" id="exampleText" />
                 </FormGroup> </div>
	);
};
export default Notes;