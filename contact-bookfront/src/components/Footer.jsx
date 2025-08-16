import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-gray-950 text-white py-4 fixed bottom-0 left-0 w-full">
			<div className="flex flex-col items-center space-y-2 text-center">
				<div className="flex space-x-4">
					<a href="https://github.com/JCesar206" target="_blank" rel="noopener noreferrer">
						<FaGithub className="hover:text-orange-400" size={20} />
					</a>
					<a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noopener noreferrer">
						<FaLinkedin className="hover:text-orange-400" size={20} />
					</a>
					<a href="mailto:jcesar206@hotmail.com">
						<FaEnvelope className="hover:text-orange-400" size={20} />
					</a>
				</div>
			</div>
			<p className="text-sm font-semibold text-center">&copy; {new Date().getFullYear()} Contact Book V 1.0 JulyDevops.
				Todos los derechos reservados.
			</p>
		</footer>
	);
}