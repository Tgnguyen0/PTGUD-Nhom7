function ShadowButton({ children, onClick, disabled }) {
    return (
        <button
            type="button"
            className="font-semibold text-white mx-1"
            style={{
                borderRadius: "60px", 
                paddingLeft: "20px",
                fontSize: "18px",
                outline: "none",
                transition: "0.3s ease-in-out",
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)"
            }}
            onClick={onClick}
            disabled={disabled}
            onFocus={(e) => e.target.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.4)"}
            onBlur={(e) => e.target.style.boxShadow = "0px 4px 10px rgba(255, 255, 255, 0.2)"}
        >{children}</button>
    );
}

export default ShadowButton;