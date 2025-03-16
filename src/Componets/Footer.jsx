const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white">
            <div className="container mx-auto py-8 p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">

                    {/* About Us */}
                    <div>
                        <div className="mb-14">
                            <h6 className="text-lg font-bold uppercase mb-3">About Us</h6>
                            <p className="text-sm mb-4 ">
                                Welcome to our website, your ultimate destination for watching movies online.
                                Enjoy a seamless experience with a wide selection of films to suit every taste!
                            </p>
                        </div>
                        <div>
                            <div className="flex">
                                <input
                                    type="email"
                                    className="flex-1 p-2 rounded-l-md border border-gray-600 focus:outline-none"
                                    placeholder="Enter your email"
                                />
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 transition">
                                    Send
                                </button>
                            </div>
                            <p className="text-sm mt-8">
                                <a href="#!" className="text-white hover:text-gray-300">© 2023 Cheffify Company</a>
                                <span className="mx-2">|</span>
                                <a href="#!" className="text-white hover:text-gray-300">Terms of Service</a>
                                <span className="mx-2">|</span>
                                <a href="#!" className="text-white hover:text-gray-300">Privacy Policy</a>
                            </p>
                        </div>
                    </div>

                    {/* Learn More */}
                    <div className="text-center">
                        <h6 className="text-lg font-bold uppercase mb-3">Watch more</h6>
                        <ul className="space-y-2">
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Our Cooks</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">See Our Features</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">FAQ</a></li>
                        </ul>
                        <h6 className="text-lg font-bold uppercase mt-8 mb-3">Shop</h6>
                        <ul className="space-y-2">
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Gift Subscription</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Send Us Feedback</a></li>
                        </ul>
                    </div>

                    {/* Recipes */}
                    <div className="text-center">
                        <h6 className="text-lg font-bold uppercase mb-3">Recipes</h6>
                        <ul className="space-y-2">
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">What to Cook This Week</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Pasta</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Dinner</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Healthy</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Vegetarian</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Vegan</a></li>
                            <li><a href="#!" className="text-sm text-white hover:text-gray-300">Christmas</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
