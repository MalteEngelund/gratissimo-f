export function Modal({ setModalIsOpen, onClose, children }) {

  

  return (
  <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <section onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg shadow-lg max-w-[80vw] w-full relative">
      {/* <button className="cursor-pointer absolute top-4 right-4" onClick={onClose}>
        x
      </button> */}
      {children}
    </section>
  </div>
  )
}