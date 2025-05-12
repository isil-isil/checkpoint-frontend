import { useQuery, useMutation } from "@apollo/client";
import { queryCountries } from "../api/countries";
import { mutationAddCountry } from "../api/addCountry";
import { Link } from "react-router-dom";
import { useState } from "react";
import { queryContinents } from "../api/continents";

export function HomePage() {
  const { data, loading, error, refetch } = useQuery(queryCountries);
  const [addCountry] = useMutation(mutationAddCountry, {
    onCompleted: () => {
      setForm({ name: "", code: "", emoji: "", continent: "" });
      refetch();
    },
    onError: (err) => alert(err.message),
  });
  const { data: continentsData } = useQuery(queryContinents);
  const continents = continentsData?.continents || [];

  const [form, setForm] = useState({
    name: "",
    code: "",
    emoji: "",
    continent: "",
  });

  const countries = data?.countries;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCountry({
      variables: {
        data: {
          name: form.name,
          code: form.code,
          emoji: form.emoji,
          continent: form.continent ? { id: parseInt(form.continent, 10) } : null,
        },
      },
    });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <section>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Code (2-3 lettres)"
          value={form.code}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="emoji"
          placeholder="Emoji"
          value={form.emoji}
          onChange={handleChange}
          required
        />
        <label htmlFor="continent">Continent :</label>
        <select
          name="continent"
          value={form.continent}
          onChange={handleChange}
        >
          <option value="">-- Aucun continent --</option>
          {continents.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>

      <div className="country-list">
        {countries.map((country: any) => (
          <Link
            to={`/${country.code}`}
            key={country.id}
            className="country-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>{country.name}</div>
            <div style={{ fontSize: "2rem" }}>{country.emoji}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
