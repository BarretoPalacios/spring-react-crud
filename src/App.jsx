import React, { useState, useEffect } from 'react'

export default function App() {
  const [alumnos, setAlumnos] = useState([])
  const [cursos, setCursos] = useState([])
  const [registros, setRegistros] = useState([])
  const [currentView, setCurrentView] = useState('alumnos')
  const [editingItem, setEditingItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Funciones para manejar alumnos
  const addAlumno = (alumno) => {
    setAlumnos([...alumnos, { ...alumno, id: Date.now() }])
  }

  const updateAlumno = (id, updatedAlumno) => {
    setAlumnos(alumnos.map(a => a.id === id ? { ...a, ...updatedAlumno } : a))
  }

  const deleteAlumno = (id) => {
    setAlumnos(alumnos.filter(a => a.id !== id))
    setRegistros(registros.filter(r => r.alumno.id !== id))
  }

  // Funciones para manejar cursos
  const addCurso = (curso) => {
    setCursos([...cursos, { ...curso, id: Date.now(), idCurso: Date.now() }])
  }

  const updateCurso = (id, updatedCurso) => {
    setCursos(cursos.map(c => c.id === id ? { ...c, ...updatedCurso } : c))
  }

  const deleteCurso = (id) => {
    setCursos(cursos.filter(c => c.id !== id))
    setRegistros(registros.filter(r => r.curso.id !== id))
  }

  // Funciones para manejar registros
  const addRegistro = (registro) => {
    setRegistros([...registros, { ...registro, id: Date.now(), fechaRegistro: new Date().toISOString().split('T')[0] }])
  }

  const updateRegistro = (id, updatedRegistro) => {
    setRegistros(registros.map(r => r.id === id ? { ...r, ...updatedRegistro } : r))
  }

  const deleteRegistro = (id) => {
    setRegistros(registros.filter(r => r.id !== id))
  }

  // Componente Modal
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-xl font-bold">&times;</button>
          </div>
          {children}
        </div>
      </div>
    )
  }

  // Componente para el formulario de alumnos
  const AlumnoForm = ({ alumno, onSubmit }) => {
    const [nombre, setNombre] = useState(alumno?.nombre || '')
    const [apellido, setApellido] = useState(alumno?.apellido || '')
    const [correo, setCorreo] = useState(alumno?.correo || '')
    const [telefono, setTelefono] = useState(alumno?.telefono || '')
    const [fechaNacimiento, setFechaNacimiento] = useState(alumno?.fechaNacimiento || '')
    const [perfilUrl, setPerfilUrl] = useState(alumno?.perfilUrl || '')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault()
      const newErrors = {}
      if (!nombre.trim()) newErrors.nombre = 'El nombre es requerido'
      if (!apellido.trim()) newErrors.apellido = 'El apellido es requerido'
      if (!correo.trim()) newErrors.correo = 'El correo es requerido'
      else if (!/\S+@\S+\.\S+/.test(correo)) newErrors.correo = 'Correo inválido'
      if (!telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
      if (!fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida'
      if (!perfilUrl.trim()) newErrors.perfilUrl = 'La URL del perfil es requerida'

      if (Object.keys(newErrors).length === 0) {
        onSubmit({ nombre, apellido, correo, telefono, fechaNacimiento, perfilUrl })
        setIsModalOpen(false)
      } else {
        setErrors(newErrors)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
        </div>
        <div>
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
        </div>
        <div>
          <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
        </div>
        <div>
          <label htmlFor="perfilUrl" className="block text-sm font-medium text-gray-700">URL del Perfil</label>
          <input
            type="text"
            id="perfilUrl"
            value={perfilUrl}
            onChange={(e) => setPerfilUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.perfilUrl && <p className="text-red-500 text-xs mt-1">{errors.perfilUrl}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {alumno ? 'Actualizar' : 'Agregar'} Alumno
        </button>
      </form>
    )
  }

  // Componente para el formulario de cursos
  const CursoForm = ({ curso, onSubmit }) => {
    const [nombreCurso, setNombreCurso] = useState(curso?.nombreCurso || '')
    const [descripcion, setDescripcion] = useState(curso?.descripcion || '')
    const [duracionHoras, setDuracionHoras] = useState(curso?.duracionHoras || '')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault()
      const newErrors = {}
      if (!nombreCurso.trim()) newErrors.nombreCurso = 'El nombre del curso es requerido'
      if (!descripcion.trim()) newErrors.descripcion = 'La descripción es requerida'
      if (!duracionHoras) newErrors.duracionHoras = 'La duración es requerida'

      if (Object.keys(newErrors).length === 0) {
        onSubmit({ nombreCurso, descripcion, duracionHoras: parseInt(duracionHoras) })
        setIsModalOpen(false)
      } else {
        setErrors(newErrors)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombreCurso" className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
          <input
            type="text"
            id="nombreCurso"
            value={nombreCurso}
            onChange={(e) => setNombreCurso(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.nombreCurso && <p className="text-red-500 text-xs mt-1">{errors.nombreCurso}</p>}
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
          ></textarea>
          {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
        </div>
        <div>
          <label htmlFor="duracionHoras" className="block text-sm font-medium text-gray-700">Duración (horas)</label>
          <input
            type="number"
            id="duracionHoras"
            value={duracionHoras}
            onChange={(e) => setDuracionHoras(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.duracionHoras && <p className="text-red-500 text-xs mt-1">{errors.duracionHoras}</p>}
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {curso ? 'Actualizar' : 'Agregar'} Curso
        </button>
      </form>
    )
  }

  // Componente para el formulario de registros
  const RegistroForm = ({ registro, onSubmit }) => {
    const [alumnoId, setAlumnoId] = useState(registro?.alumno?.id || '')
    const [cursoId, setCursoId] = useState(registro?.curso?.id || '')
    const [estadoRegistro, setEstadoRegistro] = useState(registro?.estadoRegistro || 'activo')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault()
      const newErrors = {}
      if (!alumnoId) newErrors.alumnoId = 'Seleccione un alumno'
      if (!cursoId) newErrors.cursoId = 'Seleccione un curso'

      if (Object.keys(newErrors).length === 0) {
        const alumno = alumnos.find(a => a.id === parseInt(alumnoId))
        const curso = cursos.find(c => c.id === parseInt(cursoId))
        onSubmit({ alumno, curso, estadoRegistro })
        setIsModalOpen(false)
      } else {
        setErrors(newErrors)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="alumno" className="block text-sm font-medium text-gray-700">Alumno</label>
          <select
            id="alumno"
            value={alumnoId}
            onChange={(e) => setAlumnoId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map(alumno => (
              <option key={alumno.id} value={alumno.id}>{`${alumno.nombre} ${alumno.apellido}`}</option>
            ))}
          </select>
          {errors.alumnoId && <p className="text-red-500 text-xs mt-1">{errors.alumnoId}</p>}
        </div>
        <div>
          <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso</label>
          <select
            id="curso"
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione un curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nombreCurso}</option>
            ))}
          </select>
          {errors.cursoId && <p className="text-red-500 text-xs mt-1">{errors.cursoId}</p>}
        </div>
        <div>
          <label htmlFor="estadoRegistro" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="estadoRegistro"
            value={estadoRegistro}
            onChange={(e) => setEstadoRegistro(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          {registro ? 'Actualizar' : 'Agregar'} Registro
        </button>
      </form>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sistema de Gestión Académica</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setCurrentView('alumnos')}
          className={`px-4 py-2 rounded ${currentView === 'alumnos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Alumnos
        </button>
        <button
          onClick={() => setCurrentView('cursos')}
          className={`px-4 py-2 rounded ${currentView === 'cursos' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Cursos
        </button>
        <button
          onClick={() => setCurrentView('registros')}
          className={`px-4 py-2 rounded ${currentView === 'registros' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          Registros
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => {
            setEditingItem(null)
            setIsModalOpen(true)
          }}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar {currentView.slice(0, -1)}
        </button>
      </div>

      <div className="overflow-x-auto">
        {currentView === 'alumnos' && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Apellido</th>
                <th className="py-2 px-4 border-b">Correo</th>
                <th className="py-2 px-4 border-b">Teléfono</th>
                <th className="py-2 px-4 border-b">Fecha de Nacimiento</th>
                <th className="py-2 px-4 border-b">Perfil</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(alumno => (
                <tr key={alumno.id}>
                  <td className="py-2 px-4 border-b">{alumno.nombre}</td>
                  <td className="py-2 px-4 border-b">{alumno.apellido}</td>
                  <td className="py-2 px-4 border-b">{alumno.correo}</td>
                  <td className="py-2 px-4 border-b">{alumno.telefono}</td>
                  <td className="py-2 px-4 border-b">{alumno.fechaNacimiento}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={alumno.perfilUrl} alt={`Perfil de ${alumno.nombre}`} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => {
                        setEditingItem(alumno)
                        setIsModalOpen(true)
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteAlumno(alumno.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {currentView === 'cursos' && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre del Curso</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Duración (horas)</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map(curso => (
                <tr key={curso.id}>
                  <td className="py-2 px-4 border-b">{curso.nombreCurso}</td>
                  <td className="py-2 px-4 border-b">{curso.descripcion}</td>
                  <td className="py-2 px-4 border-b">{curso.duracionHoras}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => {
                        setEditingItem(curso)
                        setIsModalOpen(true)
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCurso(curso.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {currentView === 'registros' && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Alumno</th>
                <th className="py-2 px-4 border-b">Curso</th>
                <th className="py-2 px-4 border-b">Fecha de Registro</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map(registro => (
                <tr key={registro.id}>
                  <td className="py-2 px-4 border-b">{`${registro.alumno.nombre} ${registro.alumno.apellido}`}</td>
                  <td className="py-2 px-4 border-b">{registro.curso.nombreCurso}</td>
                  <td className="py-2 px-4 border-b">{registro.fechaRegistro}</td>
                  <td className="py-2 px-4 border-b">{registro.estadoRegistro}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => {
                        setEditingItem(registro)
                        setIsModalOpen(true)
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteRegistro(registro.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {currentView === 'alumnos' && (
          <AlumnoForm
            alumno={editingItem}
            onSubmit={(alumno) => {
              if (editingItem) {
                updateAlumno(editingItem.id, alumno)
              } else {
                addAlumno(alumno)
              }
              setIsModalOpen(false)
            }}
          />
        )}
        {currentView === 'cursos' && (
          <CursoForm
            curso={editingItem}
            onSubmit={(curso) => {
              if (editingItem) {
                updateCurso(editingItem.id, curso)
              } else {
                addCurso(curso)
              }
              setIsModalOpen(false)
            }}
          />
        )}
        {currentView === 'registros' && (
          <RegistroForm
            registro={editingItem}
            onSubmit={(registro) => {
              if (editingItem) {
                updateRegistro(editingItem.id, registro)
              } else {
                addRegistro(registro)
              }
              setIsModalOpen(false)
            }}
          />
        )}
      </Modal>
    </div>
  )
}