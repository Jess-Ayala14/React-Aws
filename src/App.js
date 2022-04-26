import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listBusinesses } from './graphql/queries';
import { createBusiness as createBusinessMutation, deleteBusiness as deleteBusinessMutation } from './graphql/mutations';

const initialFormState = { name: '', about: '' }

function App() {
  const [business, setBusiness] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchBusiness();
  }, []);

  async function fetchBusiness() {
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    await Promise.all(BusinessFromAPI.map(async business => {
      if (business.image) {
        const image = await Storage.get(business.image);
        business.image = image;
      }
      return business;
    }))
    setBusiness(apiData.data.listBusinesses.items);
  }

  async function createBusiness() {
    if (!formData.name || !formData.about) return;
    await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBusiness([...business, formData]);
    setFormData(initialFormState);
  }

  async function deleteBusiness({ id }) {
    const newBusinessArray = business.filter(business => business.id !== id);
    setBusiness(newBusinessArray);
    await API.graphql({ query: deleteBusinessMutation, variables: { input: { id } } });
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBusiness();
  }

  return (
    <div className="App">
      <h1>Business List</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Business name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'about': e.target.value })}
        placeholder="about"
        value={formData.about}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createBusiness}>Save Data</button>
      <div style={{ marginBottom: 30 }}>
        {
          business.map(business => (
            <div key={business.id || business.name}>
              <h2>{business.name}</h2>
              <p>{business.about}</p>
              <button onClick={() => deleteBusiness(business)}>Delete Info</button>
              {
                business.image && <img src={business.image} style={{ width: 400 }} />
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);