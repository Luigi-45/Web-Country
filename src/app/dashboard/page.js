'use client';
import { useState } from 'react';
import styles from "@/app/page.module.css";
import { CountryFilters } from "@/Components/Dashboard/country/country_filters";
import { CountryList } from "@/Components/Dashboard/country/country_list";
import { ApolloProvider, InMemoryCache, ApolloClient} from '@apollo/client';

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

export default function Home() {
  const [filterText, setFilterText] = useState('');
  return (
    <div className={styles.page}>
      <ApolloProvider client={client}>
      <section className={styles.section}>
        <div className={styles.search}>
          <CountryFilters onFilterChange={setFilterText} filterText={filterText} />
        </div>
        <CountryList />
      </section>
      </ApolloProvider>
    </div>
  );
}
