import { useState } from "react";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput"
import CountriesTable from "../components/CountriesTable/CountriesTable"
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter((country) => 
    country.translations.br.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>{filteredCountries.length} países encontrados</div>
        <div className={styles.input}>
          <SearchInput placeholder="Filtrar por nome do país" onChange={onInputChange} />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>)
}

export const getStaticProps = async () => {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await response.json();

  return {
    props: {
      countries,
    },
  };
}
