const GamingRoomLights = () => (
  <>
    <hemisphereLight intensity={0.25} color="#c9b8ff" groundColor="#0a0612" />
    <directionalLight position={[3, 6, 4]} intensity={0.6} color="#ffe4e0" />
    <spotLight position={[-4, 4, 3]} angle={0.6} penumbra={0.5} intensity={140} color="#e5484d" />
    <pointLight position={[3, 1.5, -2]} intensity={40} color="#7c5cff" />
  </>
)

export default GamingRoomLights
