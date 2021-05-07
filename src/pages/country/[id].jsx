import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getCountry = async (id) => {
  const response = await fetch(`http://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await response.json();
  return country;
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div>
            <div className={styles.overview_panel}>
              <img src={country.flag} alt={country.name}></img>
              <h1 className={styles.overview_name}>{country.name}</h1>
              <div className={styles.overview_region}>{country.region}</div>
              <div className={styles.overview_statistics}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_value}>{country.population}</div>
                  <div className={styles.overview_label}>População</div>
                </div>
                <div className={styles.overview_area}>
                  <div className={styles.overview_value}>
                    {country.area}km<sup style={{fontSize:"0.5rem"}}>2</sup>
                  </div>
                  <div className={styles.overview_label}>Área</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Detalhes</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>{country.capital}</div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Sub-região</div>
              <div className={styles.details_panel_value}>{country.subregion}</div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Idiomas</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Moedas</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}  
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Nome Nativo</div>
              <div className={styles.details_panel_value}>{country.nativeName}</div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Índice de Desigualdade de Renda (GINI)</div>
              <div className={styles.details_panel_value}>{country.gini}%</div>
            </div>
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>Fronteiras</div>
              <div className={styles.details_panel_borders_container}>
                {borders.map(({ flag, name }) => (
                  <div className={styles.details_panel_borders_country}>
                    <img src={flag} alt={name}></img>
                    <div className={styles.details_panel_borders_name}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
