import { ScreenLayout } from "@/components/ui/screen-layout";

export default function AboutUsPage() {
	return (
		<ScreenLayout showBackButton>
			<ScreenLayout.Title>Sobre nosotros</ScreenLayout.Title>
			<div className="flex flex-col gap-6">
				<p>
					Bienvenido a Lucky Shoes, tu destino número uno para los sneakers más exclusivos y deseados del mercado.
					Nacimos de una pasión compartida por la cultura sneaker y el deseo de crear un espacio donde los entusiastas
					puedan encontrar piezas únicas que definan su estilo.
				</p>
				<p>
					En Lucky Shoes, creemos que cada par de zapatillas cuenta una historia. Por eso, nuestro equipo de expertos se
					dedica a curar una colección inigualable, que abarca desde los clásicos atemporales hasta las colaboraciones
					más recientes y limitadas. Trabajamos directamente con las marcas y una red de coleccionistas de confianza
					para garantizar la autenticidad y calidad de cada producto que ofrecemos.
				</p>
				<p>
					Nuestra misión es más que solo vender zapatillas; queremos construir una comunidad. Un lugar donde puedas
					descubrir, compartir y celebrar la cultura sneaker. Ofrecemos contenido exclusivo, historias detrás de cada
					lanzamiento y un servicio al cliente personalizado para que tu experiencia sea excepcional.
				</p>
				<p>Gracias por elegir Lucky Shoes. Estamos emocionados de acompañarte en cada paso de tu viaje sneaker.</p>
			</div>
		</ScreenLayout>
	);
}
