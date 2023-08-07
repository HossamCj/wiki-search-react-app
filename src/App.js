import {useState, useEffect} from 'react'
import usePrevState from './hooks/usePrevState';

import axios from 'axios'



export default function App() {
	console.log("MAIN: re-render")

	const [term, setTerm] = useState("javascript")
	const [result, setResult] = useState([]);
	
	const prevTermState = usePrevState(term)

	
	useEffect(() => {
		// API
		console.log("useEffect API: FIRE!")
		
		const search = async () => {
			
			const respond = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				},
			});
			setResult(respond.data.query.search);
			console.log('search: FIRE!')
		};
	
		if (!result.length) {
			search();
			console.log('Fired because resultState EMPTY!')
		} else if (term !== prevTermState) {
		  const debounceSearch = setTimeout(() => {
			if (term) {
			  search();
			  console.log('Fired because the prevState !== termState')
			}
		  }, 1400);
	
		  return () => {
			clearTimeout(debounceSearch);
		  };
		}
	}, [prevTermState, result.length, term]);
	
	
	  const fetchResult = result.map((el) => {
		return (
		  <tr key={el.pageid}>
		 	<td>*</td>
			<td>{el.title}</td>
			<td>
			  <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
			</td>
		  </tr>
		);
	  });


	return (
		<div className='container'>

			<div className='row'>
				<div className='col'>
					<div className='my-3'>
						<label htmlFor='exampleFormControlInput1' className='form-label'>
							Search Input
						</label>
						<input
							type='text'
							className='form-control'
							id='exampleFormControlInput1'
							onChange={(e) => setTerm(e.target.value)}
							value={term}
						/>
					</div>
				</div>
			</div>

			<div className='row'>
				<p>Current termState: { term }</p>
				<p>Previous termState: { prevTermState }</p>
			</div>

			<div className='row'>
				<div className='col'>
					<table className='table'>
						<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Title</th>
							<th scope='col'>Desc</th>
						</tr>
						</thead>
						<tbody>{fetchResult}</tbody>
					</table>
				</div>
			</div>
			
		</div>
	);
}