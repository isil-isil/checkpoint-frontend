import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { queryCountry } from "../api/country";

export function CountryDetailPage() {
    const { code } = useParams<{ code: string }>();

    const { data, loading, error } = useQuery(queryCountry, {
        variables: { code },
        skip: !code,
    });

    const country = data?.country;

    if (loading) return <p>Chargement...</p>;
    if (error || !country) return <p>Pays introuvable</p>;

    return (
        <section>
            <div className="country-detail">
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>{country.emoji}</div>
                <p>Name : {country.name} ({country.code})</p>
                <p>Continent : {country.continent?.name ?? "RAS"}</p>
            </div>
        </section>
    );
}