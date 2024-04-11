import React from 'react'
import FormAdd from './components/formAdd'
import DataComponent from './components/DataComponent'

const App: React.FC = () => {
	return (
		<div>
			<tr>
				<th>
					<FormAdd />
					<DataComponent />
				</th>
			</tr>
		</div>
	)
}

export default App
