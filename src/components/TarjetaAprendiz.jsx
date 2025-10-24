// src/components/TarjetaAprendiz.jsx
export default function TarjetaAprendiz({ nombre, ficha, programa }) {
return (
<article style={{
border:"1px solid #ddd",
padding:"12px",
borderRadius:"10px",
marginBottom:"10px"
}}>
<h4>{nombre}</h4>
<p>Ficha: {ficha}</p>
<small>{programa}</small>
</article>
);
}